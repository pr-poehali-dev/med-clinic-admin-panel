import json
import os
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    '''Отправка SMS-напоминаний пациентам через шлюз SMS.ru'''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method == 'GET':
        configured = bool(os.environ.get('SMSRU_API_ID'))
        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'configured': configured, 'provider': 'sms.ru'}),
        }

    body = json.loads(event.get('body') or '{}')
    phone = str(body.get('phone', '')).strip()
    text = str(body.get('text', '')).strip()

    if not phone or not text:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'phone and text are required'}),
        }

    api_id = os.environ.get('SMSRU_API_ID')
    if not api_id:
        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': False, 'error': 'SMSRU_API_ID не настроен. Добавьте ключ в настройках.'}),
        }

    params = urllib.parse.urlencode({
        'api_id': api_id,
        'to': phone,
        'msg': text,
        'json': 1,
        'from': body.get('from', 'SKL'),
    })
    url = f'https://sms.ru/sms/send?{params}'

    try:
        with urllib.request.urlopen(url, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': data.get('status') == 'OK', 'result': data}),
        }
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': False, 'error': str(e)}),
        }

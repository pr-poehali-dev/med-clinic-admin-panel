import json
import os


def handler(event: dict, context) -> dict:
    '''Web Push уведомления (VAPID): выдача публичного ключа, сохранение подписок, отправка'''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    public_key = os.environ.get('VAPID_PUBLIC_KEY', '')

    if method == 'GET':
        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({
                'publicKey': public_key,
                'configured': bool(public_key and os.environ.get('VAPID_PRIVATE_KEY')),
            }),
        }

    body = json.loads(event.get('body') or '{}')
    action = body.get('action', 'subscribe')

    if action == 'subscribe':
        subscription = body.get('subscription')
        if not subscription:
            return {
                'statusCode': 400,
                'headers': {**cors, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'subscription is required'}),
            }
        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True, 'message': 'Подписка на push-уведомления сохранена'}),
        }

    if action == 'send':
        title = body.get('title', 'СКЛ')
        message = body.get('message', '')
        if not os.environ.get('VAPID_PRIVATE_KEY'):
            return {
                'statusCode': 200,
                'headers': {**cors, 'Content-Type': 'application/json'},
                'body': json.dumps({'ok': False, 'error': 'VAPID-ключи не настроены'}),
            }
        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True, 'sent': {'title': title, 'message': message}}),
        }

    return {
        'statusCode': 400,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'error': 'unknown action'}),
    }

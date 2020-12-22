import requests

html_file = open('../_layouts/default.html','w')

APP_KEY = '687ea12e4ef2be02334d085696877d60'
# IMAGE_URL = 'http://example.com/example.jpg'
IMAGE_FILE_PATH = '../assets/people.jpg'
session = requests.Session()
session.headers.update({'Authorization': 'KakaoAK ' + APP_KEY})

# URL로 이미지 입력시
# response = session.post('https://cv-api.kakaobrain.com/pose', data={'image_url': IMAGE_URL})
# print(response.status_code, response.json())

# 파일로 이미지 입력시
with open(IMAGE_FILE_PATH, 'rb') as f:
    response = session.post('https://cv-api.kakaobrain.com/pose', files=[('file', f)])
    print(response.status_code, response.json())
    
 data = ''
 for i in a: #TIP: use a generator
     scope['x']+=1
     data += a[x]
     data += '\n'
 html_file.write(data)
 html_file.close()

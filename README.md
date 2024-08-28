###

# 프로젝트 설명
![image](https://github.com/user-attachments/assets/5a9220cf-b2f1-4620-a17d-54e68d758188)

cornerstone.js를 활용한 DICOM 뷰어 만들기

# 실행

1. 폴더를 열고 Flask 서버 실행

```python dicom_server.py```

Flask 서버가 올바르게 실행되고 있다면, 다음과 같은 메시지가 나와야 합니다:

```
 * Serving Flask app 'dicom_server'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:8001
Press CTRL+C to quit

```

단계 2: HTML 파일을 서빙할 HTTP 서버 실행

Python HTTP 서버 실행:

```python -m http.server 8000```

Python HTTP 서버가 올바르게 실행되었다면, 다음과 같은 메시지가 나와야 합니다:

```Serving HTTP on :: port 8000 (http://[::]:8000/) ...
```


단계 3: 브라우저에서 HTML 파일 열기

브라우저를 열고, 주소창에 다음 URL을 입력합니다:


```http://localhost:8000/index.html
```


이제 브라우저에서 HTML 파일이 열리고, Flask 서버에서 DICOM 파일 목록을 가져와 이미지를 표시할 수 있어야 합니다.







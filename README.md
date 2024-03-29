<img src="전개도.png" />

### 인증단계  

1. http://front.end/auth/code/[code] 접속
2. 백엔드 api로 코드 검증 후 디스코드 Oauth2 로그인 페이지 접속  
 2.1 코드 검증 api  
POST /auth/code/\[code]  
Content-Type: application/json  
Request body
```js
{
    "code": "ladfjlkdasfjkladfjklfaljkasdfjkdfasj;"
}
```
Response example
```js
{
    "code": 200,
    "success": true
}
```
3. 리다이렉트로 http://front.end/auth/discord?code=\[code] 접속
4. 백엔드 api로 디스코드 Oauth2 토큰 발급  
 4.1 디스코드 Oauth2 토큰 api  
GET /auth/discord  
Parameter  
code: 디스코드 oauth2 코드 
Reponse Example  
```js
{
    code: 200,
    success: true,
    refresh_token: "nbab@NLnlafaljf(@E"
}
```
5. http://front.end/auth/verify 이동 후 리캡챠 인증
6. 로컬스토리지의 code, refresh_token, captcha_token 확인 후 백엔드 api 요청  
 6.1 최종 인증 api  
POST /auth/verify  
Content-Type: application/json  
Request body
```js
{
    "code": string,
    "refresh_token": string,
    "captcha_token": string
}
```
Request body example
```js
{
    "code": "awfkoafhia=aefoawefhio;aehoawef=ohiefhoawehuaf-9waeuiaweh",
    "refresh_token": "sadfhkasfji;asfkfaifi",
    "captcha_token": "jiajkdfjksdfjksdfj"
}
```
Response example
```js
{
    "code": 200,
    "success": true,
    "message": "Verified successfully"
}
```
7. 끄으으읕
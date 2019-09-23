rem
rem Copy the client build artifacts to the web application folder
rem
xcopy client\build\*.* src\main\webapp /s /e /y
pause
# Logs Dashboard
### 1. Installation for web
1. Install Webpack and gulp globally
    ```
    npm install webpack -g
    npm -g install gulp-cli
    npm install gulp -g
    ```

2. Set your AWS credentials in your systems Environment Variable
    
    | Environment Variable    |       Value               |
    | ----------------------- |:-------------------------:|
    | AWS_ACCESS_KEY_ID       |   XXXXXX value XXXXXX     |
    | AWS_SECRET_ACCESS_KEY   |   XXXXXX value XXXXXX     |

3. Set your basic authentication credentials to login into Web
    
    | Environment Variable    |       Value               |
    | ----------------------- |:-------------------------:|
    | AUTH_USERNAME           |   synerzip                |
    | AUTH_PASSWORD           |   password                |

4. Clone the repo,traverse to the "web" folder and run the installation commands
    ```
    npm install
    ```
5. Run the gulp command from command prompt
    
    ```
    gulp
    ```
6. Open the browser, and enter the basic auth credentials to view logs.
    
    ```
    http://localhost:3001/
    ```

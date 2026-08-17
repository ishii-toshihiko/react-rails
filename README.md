# ✅ React + Typescript + Vite for Rails-API mode
1. ## 🟦Rails起動
    1. Docker DesktopをWindowsで起動する
    1. ターミナルよりdocker composeでRailsを起動する
        ```sh
        docker compose -f docker-compose.dev.yml up
        ```
1. ## 🟦DB作成
    1. Railsの内部にDBを作成する
        * これを実行しないとRailsの起動時にエラーとなる
        ```sh
        docker compose exec web bin/rails db:migrate
        ```
1. ## 🟦データ登録
    1. Railsにデーターを登録する
        ```sh
        docker compose exec web bin/rails db:seed
        ```
1. ## 🟦Login方法
    1. ### ユーザー登録する
        * __Advanced REST Client__ を起動しユーザーを登録する
        1. #### URLを設定する
            * `http://localhost:3000/v1/auth`
        1. #### Dataをjson形式で設定する
            ```json
            {
              "email": "xxxx@example.com",
              "password": "yyyyyy"
            }
            ```
        1. #### 送信する
            * `POST`を選択して ▶️ アイコンを押す
        1. #### 確認する
            * `Response`で `200` __OK__ を受信したことを確認する
    1. ### React起動
        1. Reactのディレクトリに移動する
            ```sh
            cd /home/＜ユーザー＞/react-rails
            ```
        1. Reactを起動する
            ```sh
            npm run dev
            ```
        1. Browserを起動する
    1. ### ログインする
        1. ブラウザより次のURLにアクセスする
            `http://localhost:5173/`
        1. 画面右上の`ログインページへ`を押す
        1. 表示されたログイン画面より登録したメールアドレス：`email`とパスワード：`password`でログインする
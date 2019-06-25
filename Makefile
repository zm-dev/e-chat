clean:
	rm -rf ./build

build:
	yarn build

upload: clean build
	scp -r ./build/* root@v2.ypdan.com:/mnt/nginx/chat/frontend


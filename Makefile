dev:
	yarn tauri dev

build:
	yarn tauri build

build-win-32:
	yarn tauri build --target i686-pc-windows-msvc

build-win-arm:
	tauri build --target aarc64-pc-windows-msvc

build-apple-m1:
	yarn tauri build --target aarch64-apple-darwin

build-apple-intel:
	yarn tauri build --target x86_64-apple-darwin

build-apple-all:
	yarn tauri build --target universal-apple-darwin

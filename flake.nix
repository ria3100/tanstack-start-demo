{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = { nixpkgs, ... }:
    let
      systems = [ "aarch64-darwin" "x86_64-darwin" "x86_64-linux" "aarch64-linux" ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
    in {
      devShells = forAllSystems (pkgs: {
        default =
          let
            sfw = pkgs.writeShellApplication {
              name = "sfw";
              runtimeInputs = [ pkgs.nodejs_24 ];
              text = ''
                exec npx --yes sfw "$@"
              '';
            };
            # vp (Vite+) は nixpkgs に未収録のため、グローバルインストール済みのバイナリを呼び出す。
            # 事前に `curl -fsSL https://vite.plus | bash` でインストールが必要。
            vp = pkgs.writeShellApplication {
              name = "vp";
              text = ''
                exec "$HOME/.vite-plus/bin/vp" "$@"
              '';
            };
          in
          pkgs.mkShell {
            packages = [
              pkgs.nodejs_24
              pkgs.pnpm
              pkgs.gh
              sfw
              vp
            ];
          };
      });
    };
}

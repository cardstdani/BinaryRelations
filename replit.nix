{ pkgs }: {
  deps = [
    pkgs.nodejs
    pkgs.ls
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server
  ];
}
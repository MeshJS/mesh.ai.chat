git clone git@github.com:MeshJS/mesh.ai.chat.git --config core.sshCommand="ssh -i ~/.ssh/id_rsa.pub"

pull:
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
git pull

alias n8n="docker run -it --rm \
	--name n8n \
	-p 5678:5678 \
	-v ~/.n8n:/home/node/.n8n \
	n8nio/n8n"

alias n8n-notion="docker run -it --rm \
	--name n8n \
	-p 5678:5678 \
	-v ~/.n8n:/home/node/.n8n \
	-v $PWD:/home/node/.notion \
	n8nio/n8n \
	/bin/sh -c 'yarn --cwd /home/node/.notion install; n8n start'"
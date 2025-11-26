---
title: "Using Matrix and Wechaty to Chat on WeChat"
author: yswtrue
categories: tutorial
tags:
  - matrix
  - featured
  - ecosystem
image: /assets/2021/02-matrix-with-wechaty-en/2020-03-matrix-appservice-wechaty.webp
excerpt: >
  Detailed deployment guide for using Matrix chat with matrix-appservice-wechaty to enable WeChat conversations through the Matrix protocol.
---

[Matrix chat](https://matrix.org/) is an excellent chat software that supports multiple chat protocols and chat bots. It also supports WeChat chatting through [matrix-appservice-wechaty](https://github.com/wechaty/matrix-appservice-wechaty).
Now let me walk through the deployment method for matrix-appservice-wechaty.

## Prerequisites

1. Domain name (let's assume your domain is example.com)
2. Server, preferably within China

### Configuration Process

#### Configure Domain Resolution

| Type  | Host                  | Priority | Weight | Port | Target               |
| ----- | --------------------- | -------- | ------ | ---- | -------------------- |
| A     | matrix                | -        | -      | -    | matrix-server-IP     |
| CNAME | element               | -        | -      | -    | matrix.<your-domain> |
| CNAME | dimension (*)         | -        | -      | -    | matrix.<your-domain> |
| CNAME | jitsi (*)             | -        | -      | -    | matrix.<your-domain> |
| SRV   | _matrix-identity._tcp | 10       | 0      | 443  | matrix.<your-domain> |

#### Configure Matrix Chat

```bash
git clone https://github.com/spantaleev/matrix-docker-ansible-deploy.git
mkdir inventory/host_vars/example.com/
export MATRIX_REGISTRATION_ADMIN_SECRET=$(pwgen -s 64 1)
echo '
matrix_domain: example.com
matrix_ssl_lets_encrypt_support_email: ${email}
matrix_synapse_enable_registration: true
matrix_registration_admin_secret: "${MATRIX_REGISTRATION_ADMIN_SECRET}"
matrix_postgres_connection_password: 'synapse-password'
matrix_synapse_federation_enabled: true
matrix_ma1sd_enabled: true
' > inventory/host_vars/example.com/vars.yml
echo 'example.com ansible_host=example.com ansible_ssh_user=root' >> inventory/hosts
ansible-playbook -i inventory/hosts setup.yml --tags=setup-all,start
```

After everything is deployed, you can check if there are any issues:

```bash
ansible-playbook -i inventory/hosts setup.yml --tags=self-check
```

#### Configure matrix-appservice-wechaty

Connect to the remote server.

Create `docker-compose.yml` and fill in the following content:

```yaml
version: '2'
services:
  wechaty-gateway:
      image: wechaty/wechaty:next
      volumes:
        - /matrix/synapse/config:/data
      networks:
        - default
      environment:
        - WECHATY_PUPPET_SERVER_PORT=7777
        - WECHATY_TOKEN={{random_token}}
        - WECHATY_PUPPET=wechaty-puppet-padlocal
        - WECHATY_PUPPET_PADLOCAL_TOKEN={{padlocal_token}}
      ports:
        - 7777:7777
  matrix-appservice-wechaty:
      container_name: matrix-appservice-wechaty
      image: wechaty/matrix-appservice
      volumes:
        - /matrix/synapse/config:/data
      networks:
        - default
      environment:
        - WECHATY_PUPPET_SERVICE_TOKEN=puppet_{{random_token}}
        - WECHATY_PUPPET_SERVICE_ENDPOINT=example.com:7777
        - WECHATY_PUPPET=wechaty-puppet-service
#        - WECHATY_PUPPET=wechaty-puppet-puppeteer
        - WECHATY_LOG=silly
      command: ["--config", "/data/wechaty-config.yaml", "--file", "/data/wechaty-registration.yaml"]
      ports:
        - 8788:8788
```

`padlocal_token` needs to be [requested](https://wechaty.js.org/docs/puppet-services/)
`random_token` is a random string, you can use uuid
If you don't have a `padlocal_token`, you can use `wechaty-puppet-puppeteer` by changing the content to:

```yaml
version: '2'
services:
  matrix-appservice-wechaty:
      container_name: matrix-appservice-wechaty
      image: wechaty/matrix-appservice
      volumes:
        - /matrix/synapse/config:/data
      networks:
        - default
      environment:
        - WECHATY_PUPPET=wechaty-puppet-puppeteer
        - WECHATY_LOG=silly
      command: ["--config", "/data/wechaty-config.yaml", "--file", "/data/wechaty-registration.yaml"]
      ports:
        - 8788:8788
```

Then create the file `/matrix/synapse/config/wechaty-config.yaml` and fill in the following content:

```properties
domain: example.com
homeserverUrl: https://matrix.example.com
registration: /data/wechaty-registration.yaml
```

Run `docker-compose run --rm matrix-appservice-wechaty --config /data/wechaty-config.yaml --url "http://example:8788" --generate-registration` to generate the configuration file.

Then edit `/matrix/synapse/config/homeserver.yaml`
Change the `app_service_config_files` line to `app_service_config_files: ["/data/wechaty-registration.yaml"]`

Run `systemctl restart matrix-*` to restart Matrix services.

#### Register and Login

1. Open `https://example.com`, then register an account
2. Click the ➕ next to `People`, then enter `@wechaty:example.com` and click `Go`
3. In the opened chat window, wait for `This room has been registered as your bridge management/status room.` to appear
4. Then send `!login`. If you see the prompt `You are not enable matrix-appservice-wechaty yet. Please talk to the wechaty bot to check you in.
I had enabled it for you ;-)` send it again
5. Scan the QR code to login

### References

1. <https://github.com/spantaleev/matrix-docker-ansible-deploy>
2. <https://wechaty.js.org/2021/01/28/csharp-wechaty-for-padlocal-puppet-service/>
3. <https://github.com/wechaty/wechaty-puppet-puppeteer>

> Author: [Roy](https://blog.yswtrue.com). Originally published on blog: [Using Matrix and Wechaty to Chat on WeChat](https://blog.yswtrue.com/yong-matrix/)

---

> 本文也有[中文版本](/2021/02/04/matrix-with-wechaty/)。

FROM node:10.0.0

# apt-get must be updated first
RUN apt-get update

# Official AWS documentation recommends using python3 and associated tooling.
# That doesn't work, or at least it does not work as easily as advertised.
# Instead, just go with 'standard' python
RUN apt-get install python-dev python-pip -y \
  gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
  libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 \
  libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 \
  libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
  libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
  libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 \
  lsb-release xdg-utils inotify-tools wget

RUN pip install awscli

RUN npm i -g yarn

# Copy source code and locate working dir
RUN mkdir /snapshot
ADD ./ /snapshot
WORKDIR /snapshot
RUN yarn add grunt-cli

CMD bash watcher.sh

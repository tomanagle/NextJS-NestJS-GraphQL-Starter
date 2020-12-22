# NextJS & NestJS GraphQL Starter
A NextJS frontend and NextJS backend GraphQL starter pack that includes GitHub & Reddit authentication.

## Features
- [x] Google authentication
- [x] GitHub authentication
- [x] Reddit authentication
- [x] Update basic profile information
- [x] Server rendering
- [x] Translation

## Technologies
* [NextJS](https://nextjs.org/)
* [Bumbag](https://bumbag.style/)
* [styled-components](https://styled-components.com/)
* [Apollo Client 3.0](https://www.apollographql.com/docs/react/)
* [GraphQL Code Generator](https://graphql-code-generator.com/)
* [Yup](https://github.com/jquense/yup)
* [TypeScript](https://www.typescriptlang.org/)
* [NestJS](https://nestjs.com/)
* [Mongoose](https://mongoosejs.com/)
* [TypeGraphQL](https://typegraphql.com/)
* [react-i18next](https://react.i18next.com/)

## Getting started

1. Install the required packages
    ```bash
    cd client && yarn
    cd server && yarn
    ```

2. Update the .env files in the client & server
    ```bash
    cp client/.env.example .env
    cp server/.env.example .env
    ```

3. Start the server & client
   
    ```bash
    cd server && yarn dev
    cd client && yarn dev
    ```
  > The client requires that the server is started so it can read the schema to run codegen. To remove that functionality, remove the predev hook in `client/package.json`

## Deployment
The easiest way to deploy is:
1. Create a [DigitalOcean](https://m.do.co/c/1b74cb8c56f4) droplet using the Docker image
2. Setup Nginx with this guide: [How To Install Nginx on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)
3. Clone the repository onto the droplet
4. Add your .env files with your production configuration to the client and server
5. Signup for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and get your connection string
6. Mode the build script to make it executable: `chmod +x ./build.sh`
7. Run the build script ./build.sh
8. Modify and copy the supplied `nginx.conf` into `/var/etc/nginx/sites-available/default`
9. Generate the SSL certificate with this guide: [How To Secure Nginx with Let's Encrypt on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Support
[Buy me a Coffee](https://www.buymeacoffee.com/tomn)

[Sign up to DigitalOcean](https://m.do.co/c/1b74cb8c56f4) I 💖 DigitalOcean

## License
[MIT](https://choosealicense.com/licenses/mit/)
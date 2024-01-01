<div align="center">
    <img width=400 height="auto" src=https://sharik-assets-bucket.s3.eu-central-1.amazonaws.com/dung-beetle-logo.png alt='Dung Beetle Logo' />
</div>

<div align="center">
    ![Deployment](https://github.com/kim-knudsen/dung-beetle/actions/workflows/deploy.yaml/badge.svg)
</div>

<br />

**Dung Beetle** serves as a pet project to elucidate the utilization of [Fastify](https://fastify.dev/) in a serverless environment.
The setup is deployed on [Amazon Web Services](https://aws.amazon.com/) (AWS) leveraging key AWS services such as AWS Lambda and API Gateway.

The project employs a custom domain at https://dung.nissearm.dk, with the securing of its certificate undertaken by the AWS Certificate Manager so that the application can establish secure connections.

The repository takes advantage of Swagger to illustrate the documentation of the RESTful API in a simplified and presentable manner.

Furthermore, the project incorporates Github Actions for continuous integration and deployment to AWS. A new release can be conveniently scheduled directly from the GitHub UI by
making use of the "releases" option.

Please note, **Dung Beetle** is purely for educational purposes, aiming to provide a hands-on approach to learning and understanding the integration of Fastify with serverless architecture on AWS.

### Quick start

```sh
npm install
npm run dev
```


// Cube.js configuration options: https://cube.dev/docs/config
const AthenaDriver = require('@cubejs-backend/athena-driver');
const { getDefaultRoleAssumerWithWebIdentity } = require("@aws-sdk/client-sts");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const provider = defaultProvider({
  roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity({
    region: process.env.CUBEJS_AWS_REGION
  }),
});

module.exports = {
  driverFactory: ({ securityContext, dataSource }) =>
    new AthenaDriver({
      catalog: process.env.CUBEJS_AWS_ATHENA_CATALOG,
      schema: process.env.CUBEJS_DB_NAME,
      S3OutputLocation: process.env.CUBEJS_AWS_S3_OUTPUT_LOCATION,
      workGroup: process.env.CUBEJS_AWS_ATHENA_WORKGROUP,
      credentialDefaultProvider: provider,
    }),
};

// This is the script that will be run to test out the API endpoints
const axios = require("axios");
const fs = require("fs");
const { expect } = require("chai");
const { response } = require("express");
const request = require("superagent");
const https = require("https")
const passwd = fs.readFileSync("../creds/mongoApiTest.txt", "utf-8").replace(/\r?\n|\r/g, "");

// getting the certificate files
const clientKey = "-----BEGIN RSA PRIVATE KEY-----\n" +
"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\n"+
"-----END RSA PRIVATE KEY-----";

const clientCert = "-----BEGIN CERTIFICATE-----\n"+
"MIIFOTCCAyECFAYR25Uw6iXViEzbstHWy+4Bt9o/MA0GCSqGSIb3DQEBCwUAMFkx\n"+
"CzAJBgNVBAYTAlVTMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRl\n"+
"cm5ldCBXaWRnaXRzIFB0eSBMdGQxEjAQBgNVBAMMCUVidWJlIEFzbzAeFw0yMTA2\n"+
"MjkxNTQyMDNaFw0zMTA2MjcxNTQyMDNaMFkxCzAJBgNVBAYTAlVTMRMwEQYDVQQI\n"+
"DApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQx\n"+
"EjAQBgNVBAMMCUVidWJlIEFzbzCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoC\n"+
"ggIBAL58IXQBE+p1uxSFijSSxBrBtlgbxdB5lgAgbgpKa/2r0N2dduHw/bfHkEy8\n"+
"9YlT6X2rPH4PHaI7FmfpCQd1p7Iyo+g7DKwO3VqDt7AQfWLBDiLloxhSkyqgeLiv\n"+
"gvzSK2fwdk7vuW6ddsYLFoLqAD+AG1Qdj1DuXK9zM6m52asVxo7WMEfczS+28HLc\n"+
"MWrYXQfQPf+C0qNg6Utwh7jjhsYWvN7tpb8HR3knaAK2jlaDXKicqRi501ayIJuA\n"+
"EibB7jPTbT4/LI/RMkeEOOx0dWRmoI6WpONe5lMOSGNKAUrNfYLiIa/BJAu/ymtW\n"+
"rsu5TWOnsQcg0aShrjSNjMmElWCnl22dx4XQM4T7NN4sk2VRY7NFZVgemiajFUbv\n"+
"rVl2maUCHaXS68hC4uoRtV/p6E7otxEPcbQ0Y5+7VEO7X8QQfVKzwAvwmiidMShV\n"+
"C81NjYAUWnJF7Mz1XceOqW5VDDF+zrXpkOldSVolAPgsY7ue4Xd7FMk+kzVZijPW\n"+
"8HxG74vHUlOcqBkWnM2aWIDaoIXhwTfT5xbp6RLJlSpwu1514mh9L0kbKNRo5tBP\n"+
"qB5lV986uhJMjD+VHDRUQU7QPMLAeAuH5zdpoKIaobCw8nBuWmzaEYtUV3VTOspk\n"+
"W7pONH1CtwB6b2u11taLABA/cSdG77zoWNkbL2b5la19dH0zAgMBAAEwDQYJKoZI\n"+
"hvcNAQELBQADggIBAC6xVcD+5hWHHibyIwFVYJu78E+WN/CzfXrzKRZX+eGDwY3M\n"+
"4lKC0W6Ucah+48UPHMwPD1mnC8C3UkUhZmIbb5y5f8J/+YAOpudalvKydq+LWwx8\n"+
"N7z90CYN0SeC6xWdFX2YpLX0xnu+ULMYC+jqcxP82t/Egzy13CLkGMPVA0lzFoWu\n"+
"3qNvXAcspZOy54NNxhNk3gfzaZLa7+5YamtcE3nLOMQ2P195jzMaDIaqPXpqCvqC\n"+
"prpWXb9NN22IKQoVm9P1EZSWeM2vlcYmy97BuPR+F+C7XQup//Kw7tOfm6SJLm16\n"+
"zvpHLogfRU4wuC1075GXI1p7uBTjVmZPaj7yu+VFZVu6EHbFrOUtapYIJ6QOOwDj\n"+
"sXsya8kiig1xb8Kj4n1UwiVdZptsPvrfRVhQ9SQNNcpCbbQ3EZo4nJDyIs4T6zmQ\n"+
"L+6po6mPWBVX3dU7txDgMd1VY3OvqU4GqhdLfRgXoQYk9BQONX4KIwpNKp/DdkoQ\n"+
"QAYWhACm4SufEYrSsnmWyc8uTMYFS/Kf+DOqv69SyAmyaHPj+w2f5Bcrp9FCSY8d\n"+
"cU8xZ39NPR62ytVyIkN2mZ5+NlbL3Sdic2SxYqG8jvHG4MkRgk//XILXcKLbZb2k\n"+
"2X8erN4Rx7XNnIGrQK6UXaPbXGaVBpCUGTV61Unra/m2ldMNfFFRoJ+OdVZN\n"+
"-----END CERTIFICATE-----"

const caCert = "-----BEGIN CERTIFICATE-----\n"+
"MIIFkzCCA3ugAwIBAgIUU7nzR8lCNLLkE+RWWiePpTnGxJMwDQYJKoZIhvcNAQEL\n"+
"BQAwWTELMAkGA1UEBhMCVVMxEzARBgNVBAgMClNvbWUtU3RhdGUxITAfBgNVBAoM\n"+
"GEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDESMBAGA1UEAwwJRWJ1YmUgQXNvMB4X\n"+
"DTIxMDYyOTE1MzYyMFoXDTMxMDYyNzE1MzYyMFowWTELMAkGA1UEBhMCVVMxEzAR\n"+
"BgNVBAgMClNvbWUtU3RhdGUxITAfBgNVBAoMGEludGVybmV0IFdpZGdpdHMgUHR5\n"+
"IEx0ZDESMBAGA1UEAwwJRWJ1YmUgQXNvMIICIjANBgkqhkiG9w0BAQEFAAOCAg8A\n"+
"MIICCgKCAgEA0xVRQUSeDriP/z520NZqolH7DQU5x3PG0vqIAptyFXcX+RBYNRAy\n"+
"jaWf9F8qZWzxD4ZqAcqCQzWhtzsYY6utHyuU6lPHxQRARrULD2PCHseJg70QjWyy\n"+
"2xPccxhvlfKvLlStF1cPXxyk2U1qer/cyUxXv2zARtkstjx7Icy9M3t0ynhJfb7g\n"+
"svmbajwj5tdnp5x8rS2nzN7bz9wuj84706TEBMWVi65Qm5+A21fMeDiSq46bZaCd\n"+
"ELoX5UF9yDda3IxsadF5vPMpe4rstFTbJ0o/tizF/u3jynsqOfL4bMU21CZMZMI7\n"+
"O11kUgrEZihntjeNzqaNvmAkckSLOo4+aawjDB5AkYWigB2UHaK9qK+3RJzDFhOK\n"+
"7YZa2PUH3C5qAwiL9+YLGcXdlbCdR1YiPzZJl0oJkteflOogEZ/neck7/t69+tcu\n"+
"wOYNGkSmMvQZ3HrEuaxOUyOpNcmLZQFgV3vaCqHSHsuGFVGnm2NGS7D8/wAlxaAF\n"+
"e5X4JzqDyKScEriS5DmONtTE6jyoqCZSVoOh670k3gbPGFnoxDTpIad8xmUIDD3B\n"+
"lDx+UWGDeV+LY3tQ463By9cAKNcZH7Pd6G9RXYjXJ2nj7HEsFpUkQ3u8a08lvrKB\n"+
"GQNEJQ6a9Pe7J0eUAIFd3EKY6PPjL/M3zKURiP14B341ASvYhOcTvaECAwEAAaNT\n"+
"MFEwHQYDVR0OBBYEFJbXohre4zh2MDEOLliXgwmmA9ZwMB8GA1UdIwQYMBaAFJbX\n"+
"ohre4zh2MDEOLliXgwmmA9ZwMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQEL\n"+
"BQADggIBAA7g9pmtJPnnvoD+fukbO40NT8MxoUBVBllLIxH/sulePOo09Wxcl5/S\n"+
"kL1IMHiNybI725P0eYcrqb2o7KVmSF0YNF6MyajoTNczdsJL0GExRoXrhTcSkqrz\n"+
"ztv7UkMOhDM5i+ULzGcME8yPOBJ3JJjh/mXABjGlPwa9ibSIHVIckPkYw4wOT+L0\n"+
"G/O82IGKS6yT+qLkZA9QV1QR1SZCfGf1NolAL03Wv6U7EAs2x3FnEEFMsNWa39dB\n"+
"CP1RSio+8olQ0EO1+ugOV9cvt3R/TngfwY9Qx4iNMkHNXaNBaegL1rBT4uN11/I/\n"+
"/PmV4XLOwOEWQmodnFhTMw9YdGsEp5SA46AnhkrHUPcGxBnoYYaC9QvH4Ajo9WYT\n"+
"cpV7A3WFUREuLojp2XA5EKNEhfCtD2PEkYuvvAly9w6PVtYbDYGYRT/eih+POlLX\n"+
"VFuIT8q/HzltVb7wrPg6f37KxBn5D3dC87oZm7WQRGHPPjSa/G2GLnkRhrckm+6U\n"+
"SF9uNYu8ID239vyBqmEHBb9FkHS6QVdGZsQSDx5cOQJDHJPgAIf4WPy+6w57gpGm\n"+
"CcJoYJYm6ybCROEAyCoba93OrpqTdftNlmeMzJDIyxfCn16vhH44KTeSAAKu5Xsc\n"+
"5KJT28LEPITGxRTJa4yECdrWWtYSz+gsp8ab/tRHIKjvZcS2MC5Q\n"+
"-----END CERTIFICATE-----"

// testing out the correct credentials
const httpsAgent = new https.Agent({
        cert: clientCert,
        key: clientKey,
        ca: caCert,
        rejectUnauthorized: false
    })
axios.post("https://localhost:9900/testvault", {
    username: "pierre", password: passwd
}, {httpsAgent}).then(response => {
    console.log(response.data);
}).catch(err => console.log(err));

// testing out the incorrect credentials
// axios.post("http://localhost:9900/testvault", {
//     username: "jaxon", password: "password123"
// }).then(response => {
//     let result = response;
// }).catch(err => {
//     let theError = err;
//     expect(theError.response.status).to.equal(400);
//     expect(theError.response.data.Message).to.equal("Failed");
//     console.log("This request testing incorrect credentials has passed!");
// });
// axios.post("http://localhost:9900/testvault", {
//     username: "pierre", password: "Ebube"
// }).then(response => {
//     let result = response;
// }).catch(err => {
//     let theError = err;
//     expect(theError.response.status).to.equal(400);
//     expect(theError.response.data.Message).to.equal("Failed");
//     console.log("This request testing incorrect credentials has passed as well!");
// });

// testing out the https endpoint
// request.post("https://localhost:9900/vaultuser")
//     .send({username: "pierre", password: passwd})
//     .disableTLSCerts()
//     .then(res => console.log(res.body))
//     .catch(err => console.log(err));
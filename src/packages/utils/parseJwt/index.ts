import jwt_decode from 'jwt-decode'

const parseJwt = (token) => jwt_decode(token)

export default parseJwt

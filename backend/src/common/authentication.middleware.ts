import { Injectable, NestMiddleware } from '@nestjs/common';
import jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

//${process.env.AUTH0_DOMAIN}

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    jwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-metlol0o.us.auth0.com/.well-known/jwks.json`,
      }),
      issuer: `https://dev-metlol0o.us.auth0.com/`,
      algorithms: ['RS256'],
    })(req, res, (err) => {
      if (err) {
        const status = err.status || 500;
        const message =
          err.message || 'Sorry we were unable to process your request.';
        return res.status(status).send({
          message,
        });
      }
      next();
    });
  }
}

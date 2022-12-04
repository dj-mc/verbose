import { NextFunction, Request, Response } from "express";

import redis_client from "../../redis.js";

async function limit_requests(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const request_address = request.socket.remoteAddress;
  const redis_response = await redis_client
    .multi()
    .incr(request_address)
    .expire(request_address, 60)
    .exec();
  console.log("Redis increment:", redis_response);
  next();
}

export default limit_requests;

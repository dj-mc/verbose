import { NextFunction, Request, Response } from "express";

import redis_client from "../../redis.js";

function limit_requests(time_limit: number, request_limit: number) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const request_address = request.socket.remoteAddress;
    const [redis_response] = await redis_client
      .multi()
      .incr(request_address)
      .expire(request_address, time_limit) // In seconds
      .exec();
    console.log("Redis increment:", redis_response[1]);
    if (redis_response[1] >= request_limit) {
      response.json({ logged_in: false, status: "Too many auth requests" });
    } else {
      next();
    }
  };
}

export default limit_requests;

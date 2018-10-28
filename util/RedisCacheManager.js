const redis = require('redis');
const config = require('../config/config');
const defaultTTL = 300;
const RedisConfig = config.REDIS_CONFIG;

module.exports.loadRedisCacheManager = function loadRedisCacheManager() {
    let redisHost = RedisConfig.host;
    let redisPort = RedisConfig.port;
    let options = {
        host: redisHost,
        port: redisPort,
        retry_strategy: function retry(options) {
            console.log('Redis retry_strategy : ', options);
            if (options && options.error && options.error.code === 'ECONNREFUSED') {
                console.log('Redis connection refused');
            }
            return retryTime;
        }
    }
    redisClient = redis.createClient(options);
    redisClient.on('ready', function () {
        console.log("Redis Server is UP");
    });

    redisClient.on('error', function () {
        console.log("Error in Redis Connection ");
    });
}

module.exports.setCache = function (key, value) {
    if (redisClient) {
        redisClient.set(key, value);
        var ttl = getTTL();
        redisClient.expire(key, ttl);
    } else {
        console.log("setcache : : error");
    }
}

module.exports.getCache = function (key, callback) {
    if (redisClient) {
        redisClient.get(key, function (err, result) {
            callback(err, result);
        });
    } else {
        console.log('redisClient is null');
    }
}

function getTTL() {
    if (RedisConfig.expire) {
        console.log(RedisConfig.expire);
        return RedisConfig.expire
    } else {
        return defaultTTL;
    }
}

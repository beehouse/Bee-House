uri = URI.parse(ENV['REDISTOGO_URL'] || 'redis://127.0.0.1:6379')
REDIS = Redis.new(:url => ENV['REDISTOGO_URL'] || 'redis://127.0.0.1:6379')
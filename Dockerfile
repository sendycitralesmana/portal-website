FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    git curl unzip zip \
    libpq-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev \
    libonig-dev libxml2-dev \
    build-essential \
    ca-certificates gnupg \
    && docker-php-ext-configure zip \
    && docker-php-ext-install pdo_pgsql pgsql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy Laravel files
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data /var/www && \
    chmod -R 755 storage bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]



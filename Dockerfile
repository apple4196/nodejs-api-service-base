FROM node:18-alpine

# Create non-root user FIRST
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Switch to non-root user
USER nodejs

# Set workdir to nodejs user's home directory
WORKDIR /home/nodejs/workdir

# Copy package files
COPY --chown=nodejs:nodejs package*.json ./

# Install dependencies as nodejs user
RUN npm install --only=production

# Copy application files
COPY --chown=nodejs:nodejs app.js ./
COPY --chown=nodejs:nodejs routes/ ./routes/
COPY --chown=nodejs:nodejs configs/ ./configs/

# Expose port
EXPOSE 3000

# Keep container running without starting the service automatically
CMD ["tail", "-f", "/dev/null"]
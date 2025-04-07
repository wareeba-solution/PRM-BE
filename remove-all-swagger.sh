#!/bin/bash

# Script to thoroughly remove all Swagger references from the codebase
echo "Starting comprehensive Swagger removal..."

# Find all TypeScript files
find /home/joshnick/Desktop/work/PRM-BE/src -type f -name "*.ts" | while read file; do
  # Remove all Swagger-related imports
  sed -i '/import.*@nestjs\/swagger/d' "$file"
  sed -i '/import.*swagger/d' "$file"
  
  # Remove all Swagger decorators
  sed -i '/@Api/d' "$file"
  sed -i '/@Swagger/d' "$file"
  
  # Remove specific Swagger references
  sed -i '/SwaggerModule/d' "$file"
  sed -i '/DocumentBuilder/d' "$file"
  
  # Remove any lines with "swagger" in them (case insensitive)
  sed -i '/[sS][wW][aA][gG][gG][eE][rR]/d' "$file"
  
  echo "Processed: $file"
done

# Remove specific Swagger-related files if they still exist
rm -rf /home/joshnick/Desktop/work/PRM-BE/src/config/swagger 2>/dev/null

echo "Swagger removal completed!"

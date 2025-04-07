#!/bin/bash

# Script to remove Swagger decorators from all files
echo "Removing Swagger decorators from the codebase..."

# Find all TypeScript files
find /home/joshnick/Desktop/work/PRM-BE/src -type f -name "*.ts" | while read file; do
  # Remove all Swagger-related imports
  sed -i '/import.*@nestjs\/swagger/d' "$file"
  
  # Remove all Swagger decorators
  sed -i '/@Api/d' "$file"
  
  echo "Processed: $file"
done

echo "Swagger removal completed!"

#!/bin/bash

# cesta ke složce s PSD
INPUT_DIR="/Users/martinakurkovanozickova/Documents/_WORK_IN_PROGRESS/my_portfolio/images/gaiman"
OUTPUT_DIR="$INPUT_DIR/output"

# vytvoření složek pro výstup
mkdir -p "$OUTPUT_DIR/small" "$OUTPUT_DIR/medium" "$OUTPUT_DIR/large"

# smyčka přes všechny PSD soubory
for img in "$INPUT_DIR"/*.psd; do
  filename=$(basename "$img" .psd)   # název souboru bez přípony

  convert "$img" -resize 400x -quality 80 "$OUTPUT_DIR/small/${filename}_small_400.webp"
  convert "$img" -resize 600x -quality 80 "$OUTPUT_DIR/medium/${filename}_medium_600.webp"
  convert "$img" -resize 1000x -quality 80 "$OUTPUT_DIR/large/${filename}_large_1000.webp"
done

echo "✅ Hotovo! Výsledky jsou ve složce $OUTPUT_DIR"

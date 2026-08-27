#!/usr/bin/env python3
"""
LANDGUARD AI — ML Pipeline Master Training Script
Trains Delay Classifier, Delay Regressor, Feature Preprocessor, and generates model metadata.
"""

import sys
import os

# Add root directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ml.train_classifier import train_classifier
from ml.train_regressor import train_regressor

def main():
    print("=" * 60)
    print("LANDGUARD AI — MACHINE LEARNING MODEL TRAINING PIPELINE")
    print("=" * 60)

    # Train Classifier
    c_success = train_classifier()

    # Train Regressor
    r_success = train_regressor()

    if c_success and r_success:
        print("\nML Training Pipeline Completed Successfully!")
    else:
        print("\nCRITICAL: ML Training Pipeline Failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()

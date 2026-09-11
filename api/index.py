import os
import sys

# Add backend folder to sys.path so analyzer and main modules are found cleanly
backend_dir = os.path.join(os.path.dirname(__file__), '..', 'backend')
sys.path.insert(0, os.path.abspath(backend_dir))

from main import app

# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

import os
import sys
import django
from datetime import date

sys.path.insert(0, os.path.abspath("../.."))
os.environ["DJANGO_SETTINGS_MODULE"] = "secondchance_backend.settings"
os.environ["SECRET_KEY"] = "secondchance_secret_key"
django.setup()

project = "SecondChance"
copyright = f"{date.today().year}, Parth Desai"
author = "Parth Desai"
release = "1.0"

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.viewcode",
    "sphinx.ext.napoleon",
    "sphinx.ext.intersphinx",
    "sphinx.ext.autosummary",
]

templates_path = ["_templates"]
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

autosummary_generate = True  # Turn on sphinx.ext.autosummary
add_module_names = False

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_permalinks_icon = "<span>#</span>"
html_theme = "sphinxawesome_theme"

# Favicon configuration
html_favicon = "_static/favicon.ico"

# Configure syntax highlighting for Awesome Sphinx Theme
pygments_style = "default"
pygments_style_dark = "dracula"

# Additional theme configuration
html_theme_options = {
    "show_prev_next": True,
    "show_scrolltop": True,
    "main_nav_links": {
        "Docs": "index",
        "About Team": "reference/index",
        "Website": "http://localhost:3000/",
    },
    "extra_header_link_icons": {
        "Twitter": {
            "link": "https://x.com/_ParthDesai_",
            "icon": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" height="18" fill="currentColor"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>""",
            "type": "font-awesome",
            "name": "Twitter",
        },
    },
    "logo_light": "_static/logo.png",
    "logo_dark": "_static/logo.png",
}

html_static_path = ["_static"]
templates_path = ["_templates"]
html_css_files = ["custom.css"]

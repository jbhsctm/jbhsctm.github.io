import pytest
from lxml import etree


def test_html_well_formed():
    parser = etree.HTMLParser()
    with open('index.html', 'r', encoding='utf-8') as f:
        try:
            etree.parse(f, parser)
        except etree.XMLSyntaxError as e:
            pytest.fail(f"HTML syntax error: {e}")



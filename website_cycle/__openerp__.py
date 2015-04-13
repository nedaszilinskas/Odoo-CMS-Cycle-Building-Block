{
    'name': 'Cycle Building Block',
    'category': 'Website',
    'summary': 'This custom module enables a custom image slider building block in Odoo CMS.',
    'version': '1.0',
    'description': """
Cycle Building Block for Odoo CMS
======================================
        """,
    'author': 'Nedas Žilinskas <nedas.zilinskas@gmail.com>',
    'website': 'http://nedaszilinskas.com',
    'depends': ['website'],
    'data': [
        'views/assets.xml',
        'views/snippet.xml'
    ],
    'installable': True
}

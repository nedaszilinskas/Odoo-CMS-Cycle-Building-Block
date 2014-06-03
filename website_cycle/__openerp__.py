{
    'name': 'Cycle Building Block',
    'category': 'Website',
    'summary': 'his custom module enables a custom image slider building block in Odoo CMS admin bar.',
    'version': '1.0',
    'description': """
Cycle Building Block for Odoo CMS
======================================
        """,
    'author': 'Nedas Žilinskas • WebByBrains <nedas@webbybrains.com>',
    'depends': ['website'],
    'data': [
        'views/snippets.xml',
        'views/_snippets/cycle.xml'
    ],
    'installable': True
}
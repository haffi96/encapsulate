"""First migrate

Revision ID: bd57fc2825f6
Revises: 
Create Date: 2022-03-19 00:53:03.149488

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bd57fc2825f6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('items',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('title', sa.VARCHAR(length=72), nullable=False),
    sa.Column('description', sa.VARCHAR(length=320), nullable=False),
    sa.Column('owner_id', sa.INTEGER(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.create_index('ix_items_title', ['title'], unique=False)

    op.create_table('user',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('email', sa.VARCHAR(length=320), nullable=False),
    sa.Column('hashed_password', sa.VARCHAR(length=72), nullable=False),
    sa.Column('is_active', sa.BOOLEAN(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_index('ix_user_email', ['email'], unique=False)

    # ### end Alembic commands ###

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_index('ix_user_email')

    op.drop_table('user')
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.drop_index('ix_items_title')

    op.drop_table('items')
    # ### end Alembic commands ###



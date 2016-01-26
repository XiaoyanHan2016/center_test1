from app.server import app,db
from flask.ext.script import Shell,Manager,Server
from app.models import User,Store,HeadAccount,BranchAccount
manager = Manager(app)
def make_shell_context():
    return dict(app=app,db=db,User=User,Store=Store,HeadAccount=HeadAccount,BranchAccount=BranchAccount)
manager.add_command("shell",Shell(make_context=make_shell_context))

#if __name__ = "manager":
#    manager.run()
if __name__ == "__main__":
    manager.add_command('runserver',Server(host='192.168.1.31' , port=5000))
    manager.run()

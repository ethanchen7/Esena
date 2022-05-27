from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField, BooleanField, SelectField, SubmitField
from wtforms.validators import DataRequired

class ProjectForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = TextAreaField("description", validators=[DataRequired()])
    start_date = DateField("start_date", validators=[DataRequired()])
    end_date = DateField("end_date", validators=[DataRequired()])
    is_private = BooleanField("is_private")
    priority_id = SelectField("priority", choices=[1, 2, 3])
    status_id = SelectField("status", choices=[1, 2, 3])
    members = StringField("members", validators=[DataRequired()])
    #for test only:
    submit = SubmitField("Create Project")

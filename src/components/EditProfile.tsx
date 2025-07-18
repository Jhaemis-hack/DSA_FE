import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditProfileModal = ({ user, onClose, onSave }: {user: any, onClose: any, onSave: any}) => {
  const validationSchema = Yup.object({
    fullname: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    role: Yup.string().oneOf(['mentor', 'mentee']).required('Role is required'),
    phone: Yup.string(),
    bio: Yup.string(),
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-[450px] p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Edit User Profile</h2>

        <Formik
          initialValues={{
            fullname: user.fullname || '',
            email: user.email || '',
            role: user.role || '',
            skill: user.phone || [],
            bio: user.bio || '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => onSave(user._id, values)}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm">Full Name</label>
                <Field
                  name="fullname"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="fullname"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm">Email</label>
                <Field
                  name="email"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm">Role</label>
                <Field as="select" name="role" className="w-full border p-2 rounded">
                  <option value="">Select Role</option>
                  <option value="mentor">Mentor</option>
                  <option value="mentee">Mentee</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm">skill</label>
                <Field
                  name="phone"
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm">Bio</label>
                <Field
                  name="bio"
                  as="textarea"
                  rows="3"
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="flex justify-between">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                  Save Changes
                </button>
                <button onClick={onClose} type="button" className="text-gray-700">
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfileModal;

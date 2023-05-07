import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import User from '../models/User.js';
import SparkPost from 'sparkpost';

const sparky = new SparkPost(config.sprakpostKey, { origin: 'https://api.eu.sparkpost.com:443' });

export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const emailToken = jwt.sign({ email }, config.jwtSecret);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      emailToken,
    });

    await newUser.save();

    const msg = {
      options: {
        sandbox: true, // Remove this line in production
      },
      content: {
        from: 'noreply@example.com',
        subject: 'Please verify your email address',
        html: `
          <p>Hi there,</p>
          <p>Thank you for signing up! Please click the following link to verify your email address:</p>
          <p><a href="https://example.com/verify-email?token=${emailToken}">Verify Email</a></p>
          <p>If you didn't sign up for our service, please ignore this email.</p>
        `,
      },
      recipients: [{ address: email }],
    };
    // TODO: Finish emailing services
    // await sparky.transmissions.send(msg);

    res.status(201).json({ message: 'New user created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'server error' });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    const user = await User.findOne({ emailToken: token });

    if (!user) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    user.isEmailVerified = true;
    user.emailToken = null;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

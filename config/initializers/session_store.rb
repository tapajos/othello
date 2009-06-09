# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_IA_session',
  :secret      => '0a0376dd9c7bf3d74993bbc09ca0b97c27eb07f19c79385aa505dc7a7b688eb5baaff48cad5c6f1179bdc9c4c01a6b52067df2717371e71258503ac17eb5a74e'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store

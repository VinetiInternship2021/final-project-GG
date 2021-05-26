class SuperUser < ApplicationRecord
  attr_accessor :remember_token

  validates :first_name, presence: true, length: { maximum: 100 }
  validates :last_name, presence: true, length: { maximum: 100 }
  validates :password, length: { minimum: 8 }, allow_blank: true
  VALID_NUMBER_REGEX = /(^\+[0-9]{1,15}$)|(^[0-9]{1,15}$)|(^[0-9]{1,16}$)/.freeze
  validates :phone_number, length: { maximum: 12 },
                           format: { with: VALID_NUMBER_REGEX }
  has_secure_password

  def self.digest(string)
    cost = if ActiveModel::SecurePassword.min_cost
             BCrypt::Engine::MIN_COST
           else
             BCrypt::Engine.cost
           end
    BCrypt::Password.create(string, cost: cost)
  end

  def self.new_token
    SecureRandom.urlsafe_base64
  end

  def remember
    self.remember_token = SuperUser.new_token
    update_attribute(:remember_digest,
                     SuperUser.digest(remember_token))
  end

  def forget
    update_attribute(:remember_digest, nil)
  end

  def authenticated?(remember_token)
    return false if remember_digest.nil?

    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end
end

const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({  
  userinfo: {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 4
    }
  },
  playerLocation: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  inventory: {
    abe: {
      hasMet: {
        type: Boolean
      },
      balm: {
        type: Boolean
      },
      compass: {
        type: Boolean
      },
      elixir: {
        type: Boolean
      },
      feather: {
        type: Boolean
      },
      harp: {
        type: Boolean
      },
      lantern: {
        type: Boolean
      },
      logBook: {
        type: Boolean
      },
      locket: {
        type: Boolean
      },
      medicalKit: {
        type: Boolean
      },
      newt: {
        type: Boolean
      },
      pocketWatch: {
        type: Boolean
      },
      scope: {
        type: Boolean
      },
      spanner: {
        type: Boolean
      },
      spade: {
        type: Boolean
      },
      striders: {
        type: Boolean
      },
      translator: {
        type: Boolean
      }
    },
    barf: {
      hasMet: {
        type: Boolean
      },
      balm: {
        type: Boolean
      },
      compass: {
        type: Boolean
      },
      elixir: {
        type: Boolean
      },
      feather: {
        type: Boolean
      },
      harp: {
        type: Boolean
      },
      lantern: {
        type: Boolean
      },
      logBook: {
        type: Boolean
      },
      locket: {
        type: Boolean
      },
      medicalKit: {
        type: Boolean
      },
      newt: {
        type: Boolean
      },
      pocketWatch: {
        type: Boolean
      },
      scope: {
        type: Boolean
      },
      spanner: {
        type: Boolean
      },
      spade: {
        type: Boolean
      },
      striders: {
        type: Boolean
      },
      translator: {
        type: Boolean
      }
    },
    hydra: {
      hasMet: {
        type: Boolean
      },
      balm: {
        type: Boolean
      },
      compass: {
        type: Boolean
      },
      elixir: {
        type: Boolean
      },
      feather: {
        type: Boolean
      },
      harp: {
        type: Boolean
      },
      lantern: {
        type: Boolean
      },
      logBook: {
        type: Boolean
      },
      locket: {
        type: Boolean
      },
      medicalKit: {
        type: Boolean
      },
      newt: {
        type: Boolean
      },
      pocketWatch: {
        type: Boolean
      },
      scope: {
        type: Boolean
      },
      spanner: {
        type: Boolean
      },
      spade: {
        type: Boolean
      },
      striders: {
        type: Boolean
      },
      translator: {
        type: Boolean
      }
    },
    shady: {
      hasMet: {
        type: Boolean
      },
      balm: {
        type: Boolean
      },
      compass: {
        type: Boolean
      },
      elixir: {
        type: Boolean
      },
      feather: {
        type: Boolean
      },
      harp: {
        type: Boolean
      },
      lantern: {
        type: Boolean
      },
      logBook: {
        type: Boolean
      },
      locket: {
        type: Boolean
      },
      medicalKit: {
        type: Boolean
      },
      newt: {
        type: Boolean
      },
      pocketWatch: {
        type: Boolean
      },
      scope: {
        type: Boolean
      },
      spanner: {
        type: Boolean
      },
      spade: {
        type: Boolean
      },
      striders: {
        type: Boolean
      },
      translator: {
        type: Boolean
      }
    },
    taylor: {
      hasMet: {
        type: Boolean
      },
      balm: {
        type: Boolean
      },
      compass: {
        type: Boolean
      },
      elixir: {
        type: Boolean
      },
      feather: {
        type: Boolean
      },
      harp: {
        type: Boolean
      },
      lantern: {
        type: Boolean
      },
      logBook: {
        type: Boolean
      },
      locket: {
        type: Boolean
      },
      medicalKit: {
        type: Boolean
      },
      newt: {
        type: Boolean
      },
      pocketWatch: {
        type: Boolean
      },
      scope: {
        type: Boolean
      },
      spanner: {
        type: Boolean
      },
      spade: {
        type: Boolean
      },
      striders: {
        type: Boolean
      },
      translator: {
        type: Boolean
      }
    },
    violet: {
      hasMet: {
        type: Boolean
      },
      balm: {
        type: Boolean
      },
      compass: {
        type: Boolean
      },
      elixir: {
        type: Boolean
      },
      feather: {
        type: Boolean
      },
      harp: {
        type: Boolean
      },
      lantern: {
        type: Boolean
      },
      logBook: {
        type: Boolean
      },
      locket: {
        type: Boolean
      },
      medicalKit: {
        type: Boolean
      },
      newt: {
        type: Boolean
      },
      pocketWatch: {
        type: Boolean
      },
      scope: {
        type: Boolean
      },
      spanner: {
        type: Boolean
      },
      spade: {
        type: Boolean
      },
      striders: {
        type: Boolean
      },
      translator: {
        type: Boolean
      }
    },
    zara: {
      hasMet: {
        type: Boolean
      },
      balm: {
        type: Boolean
      },
      compass: {
        type: Boolean
      },
      elixir: {
        type: Boolean
      },
      feather: {
        type: Boolean
      },
      harp: {
        type: Boolean
      },
      lantern: {
        type: Boolean
      },
      logBook: {
        type: Boolean
      },
      locket: {
        type: Boolean
      },
      medicalKit: {
        type: Boolean
      },
      newt: {
        type: Boolean
      },
      pocketWatch: {
        type: Boolean
      },
      scope: {
        type: Boolean
      },
      spanner: {
        type: Boolean
      },
      spade: {
        type: Boolean
      },
      striders: {
        type: Boolean
      },
      translator: {
        type: Boolean
      }
    }
  }
});

const User = model('User', userSchema);

const getUserModel = (username) => {
  const collectionName = username.toLowerCase();
  const dynamicSchema = new Schema(userSchema.obj, {
    collection: collectionName
  });

  return model('User', dynamicSchema);
};

module.exports = { User, getUserModel };
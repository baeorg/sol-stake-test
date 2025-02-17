/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/meme_stake.json`.
 */
export type MemeStake = {
  "address": "BRhQLiCJkEZfc4B74FgqycG9XboJbUpmsJn8ACrqxrNk",
  "metadata": {
    "name": "memeStake",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "configure",
      "discriminator": [
        245,
        7,
        108,
        117,
        95,
        196,
        54,
        217
      ],
      "accounts": [
        {
          "name": "config",
          "docs": [
            "Account to store configure"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                  117,
                  114,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "payer",
          "docs": [
            "The payer."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "The [System] program."
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "docs": [
            "The [Rent] program."
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "arg",
          "type": {
            "defined": {
              "name": "configureArg"
            }
          }
        }
      ]
    },
    {
      "name": "setToken",
      "discriminator": [
        22,
        161,
        71,
        245,
        113,
        41,
        215,
        234
      ],
      "accounts": [
        {
          "name": "config",
          "docs": [
            "Account to store GlobalConfig"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                  117,
                  114,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "tokenConfig",
          "docs": [
            "Account to store TokenConfig"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ]
          }
        },
        {
          "name": "tokenMint",
          "docs": [
            "Token mint"
          ],
          "writable": true
        },
        {
          "name": "payer",
          "docs": [
            "The payer."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "The [System] program."
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "docs": [
            "The [Rent] program."
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "arg",
          "type": {
            "defined": {
              "name": "setTokenArg"
            }
          }
        }
      ]
    },
    {
      "name": "stake",
      "discriminator": [
        206,
        176,
        202,
        18,
        200,
        209,
        179,
        108
      ],
      "accounts": [
        {
          "name": "config",
          "docs": [
            "Account to store GlobalConfig"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                  117,
                  114,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "tokenConfig",
          "docs": [
            "Account to store TokenConfig"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ]
          }
        },
        {
          "name": "tokenMint",
          "docs": [
            "Token mint"
          ],
          "writable": true
        },
        {
          "name": "userStake",
          "docs": [
            "Account to store UserStake"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "tokenMint"
              },
              {
                "kind": "account",
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "vault",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "vaultAta",
          "docs": [
            "Associated account of vault"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userAta",
          "docs": [
            "Associated account of user"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "payer",
          "docs": [
            "The payer."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated [Token] program."
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL [Token] program."
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "The [System] program."
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "docs": [
            "The [Rent] program."
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "ixSysvar",
          "address": "Sysvar1nstructions1111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "arg",
          "type": {
            "defined": {
              "name": "stakeArg"
            }
          }
        }
      ]
    },
    {
      "name": "unstake",
      "discriminator": [
        90,
        95,
        107,
        42,
        205,
        124,
        50,
        225
      ],
      "accounts": [
        {
          "name": "config",
          "docs": [
            "Account to store GlobalConfig"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                  117,
                  114,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "tokenConfig",
          "docs": [
            "Account to store TokenConfig"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ]
          }
        },
        {
          "name": "tokenMint",
          "docs": [
            "Token mint"
          ],
          "writable": true
        },
        {
          "name": "userStake",
          "docs": [
            "Account to store UserStake"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "tokenMint"
              },
              {
                "kind": "account",
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "vault",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "vaultAta",
          "docs": [
            "Associated account of vault"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vault"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userAta",
          "docs": [
            "Associated account of user"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "payer",
          "docs": [
            "The payer."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "Associated [Token] program."
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL [Token] program."
          ]
        },
        {
          "name": "systemProgram",
          "docs": [
            "The [System] program."
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "docs": [
            "The [Rent] program."
          ],
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "ixSysvar",
          "address": "Sysvar1nstructions1111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "arg",
          "type": {
            "defined": {
              "name": "unstakeArg"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "globalConfig",
      "discriminator": [
        149,
        8,
        156,
        202,
        160,
        252,
        176,
        217
      ]
    },
    {
      "name": "tokenConfig",
      "discriminator": [
        92,
        73,
        255,
        43,
        107,
        51,
        117,
        101
      ]
    },
    {
      "name": "userStake",
      "discriminator": [
        102,
        53,
        163,
        107,
        9,
        138,
        87,
        153
      ]
    }
  ],
  "events": [
    {
      "name": "setTokenEvt",
      "discriminator": [
        193,
        229,
        114,
        60,
        213,
        226,
        192,
        10
      ]
    },
    {
      "name": "stakeEvt",
      "discriminator": [
        53,
        123,
        172,
        217,
        133,
        170,
        68,
        67
      ]
    },
    {
      "name": "unstakeEvt",
      "discriminator": [
        168,
        60,
        214,
        132,
        109,
        88,
        1,
        165
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidArgument",
      "msg": "Invalid argument"
    },
    {
      "code": 6001,
      "name": "invalidAuthrioty",
      "msg": "Invalid authrioty"
    },
    {
      "code": 6002,
      "name": "invalidDuration",
      "msg": "Invalid duration"
    }
  ],
  "types": [
    {
      "name": "configureArg",
      "docs": [
        "Configure arguments"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isEnable",
            "docs": [
              "Is enable to run program"
            ],
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "authority",
            "docs": [
              "The authority to set program"
            ],
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "signer",
            "docs": [
              "Signer's ed25519 pubkey"
            ],
            "type": {
              "option": {
                "array": [
                  "u8",
                  32
                ]
              }
            }
          }
        ]
      }
    },
    {
      "name": "globalConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isEnable",
            "docs": [
              "Is enable to run program"
            ],
            "type": "bool"
          },
          {
            "name": "authority",
            "docs": [
              "The authority to set program"
            ],
            "type": "pubkey"
          },
          {
            "name": "signer",
            "docs": [
              "Signer's ed25519 pubkey"
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "setTokenArg",
      "docs": [
        "SetToken arguments"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isEnable",
            "docs": [
              "Is enable to support token"
            ],
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "minAmount",
            "docs": [
              "Min amount"
            ],
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "lockTimestamp",
            "docs": [
              "Lock timestamp"
            ],
            "type": {
              "option": "i64"
            }
          }
        ]
      }
    },
    {
      "name": "setTokenEvt",
      "docs": [
        "Stake event"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "isEnable",
            "type": "bool"
          },
          {
            "name": "minAmount",
            "type": "u64"
          },
          {
            "name": "lockTimestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "stakeArg",
      "docs": [
        "Stake arguments"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fromUid",
            "docs": [
              "From uid"
            ],
            "type": "u64"
          },
          {
            "name": "toUid",
            "docs": [
              "To uid"
            ],
            "type": "u64"
          },
          {
            "name": "amount",
            "docs": [
              "Amount"
            ],
            "type": "u64"
          },
          {
            "name": "timeout",
            "docs": [
              "Signature timeout timestamp"
            ],
            "type": "i64"
          },
          {
            "name": "signature",
            "docs": [
              "Signature of signer, 64 bytes"
            ],
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "stakeEvt",
      "docs": [
        "Stake event"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "fromUid",
            "type": "u64"
          },
          {
            "name": "toUid",
            "type": "u64"
          },
          {
            "name": "unlockTimestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "tokenConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isEnable",
            "docs": [
              "Is enable to run program"
            ],
            "type": "bool"
          },
          {
            "name": "minAmount",
            "docs": [
              "Min amount"
            ],
            "type": "u64"
          },
          {
            "name": "lockTimestamp",
            "docs": [
              "Lock timestamp"
            ],
            "type": "i64"
          },
          {
            "name": "stakedAmount",
            "docs": [
              "Sum amount of stake"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "unstakeArg",
      "docs": [
        "Stake arguments"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fromUid",
            "docs": [
              "From uid"
            ],
            "type": "u64"
          },
          {
            "name": "toUid",
            "docs": [
              "To uid"
            ],
            "type": "u64"
          },
          {
            "name": "timeout",
            "docs": [
              "Signature timeout timestamp"
            ],
            "type": "i64"
          },
          {
            "name": "signature",
            "docs": [
              "Signature of signer, 64 bytes"
            ],
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "unstakeEvt",
      "docs": [
        "Stake event"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "fromUid",
            "type": "u64"
          },
          {
            "name": "toUid",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userStake",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fromUid",
            "docs": [
              "From uid"
            ],
            "type": "u64"
          },
          {
            "name": "toUid",
            "docs": [
              "To uid"
            ],
            "type": "u64"
          },
          {
            "name": "amount",
            "docs": [
              "Amount"
            ],
            "type": "u64"
          },
          {
            "name": "timestamp",
            "docs": [
              "Timestamp"
            ],
            "type": "i64"
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "seed",
      "type": "string",
      "value": "\"anchor\""
    }
  ]
};

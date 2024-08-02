using System;
using System.Security.Cryptography;

namespace Server.Utilities
{
    public static class RandomKeyGenerator
    {
        public static string GenerateRandomKey(int keySize = 32)
        {
            byte[] bytes = new byte[keySize];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(bytes);
            }
            return Convert.ToBase64String(bytes);
        }
    }
}

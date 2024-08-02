using System;
using System.Security.Cryptography;
using System.Text;

public interface IPasswordHasher
{
    string HashPassword(string password);
    bool VerifyPassword(string hashedPassword, string password);
}

public class SimplePasswordHasher : IPasswordHasher
{
    public string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            var hash = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            return hash;
        }
    }

    public bool VerifyPassword(string hashedPassword, string password)
    {
        var hashOfInput = HashPassword(password);
        return StringComparer.OrdinalIgnoreCase.Compare(hashedPassword, hashOfInput) == 0;
    }
}

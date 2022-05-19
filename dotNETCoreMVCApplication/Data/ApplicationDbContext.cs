using dotNETCoreMVCApplication.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace dotNETCoreMVCApplication.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products {get; set;}
    public DbSet<Supplier> Suppliers {get; set;}
    public DbSet<Address> Addresses {get; set;}
}

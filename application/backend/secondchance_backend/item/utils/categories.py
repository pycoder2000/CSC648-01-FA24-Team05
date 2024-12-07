# from item.models import Rental
# from item.models import Item

def get_user_rented_categories(user):
    """
    Get the categories of items that a user has rented from
    
    args: 
    user instance
    used to get items rented by user
    
    
    return: list of categories
    rtype: list?
    """
    from item.models import Rental
    # convert QuerySet to list before returning
    return list(
        Rental.objects.filter(rentals__created_by=user)
        .values_list('category', flat=True) # returns desired field 
        # .distinct() # eliminate duplicate categories
    )
    
    
    
def get_user_listed_categories(user):
    """
    Get the categories of items that a user has listed
    
    args: 
    user instance
    used to get items listed by user
    
    
    return: list of categories
    rtype: list?
    """
    from item.models import Item
    return list(
        Item.objects.filter(seller=user)
        .values_list('category', flat=True)
        # .distinct()
    )
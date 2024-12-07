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
    print("==CALLED: get_user_rented_categories()==")
    from item.models import Rental
    # convert QuerySet to list before returning
    return list(
        Rental.objects.filter(created_by=user)
        .values_list('item__category', flat=True) # returns desired field 
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
    
def count_items_rented_from_user(user):
    """
    Get the number of items that are currently being rented from the given user
    Find the rentals that have an item that belongs to the user instance passed in
    
    args:
    user instance
    
    return: number of items being rented from the user
    rtype: int
    """
    from datetime import date
    from item.models import Rental, Item
    
    print("===CALLED: count_items_rented_from_user()")
    
    today = date.today()
    
    # count the number of listings belonging to the user that are being rented out
    return Rental.objects.filter(
        item__seller = user, # listings put up by user
        start_date__lte = today, # listed items rented today or sooner
        end_date__gte = today # listed items rented today or after
    ).count()
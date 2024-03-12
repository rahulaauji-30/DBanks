import Float "mo:base/Float";
import Debug "mo:base/Debug";
actor DBank{
  stable var currentBalance:Float = 400;

  public query func checkBalance():async Float{
    return currentBalance;
  };
  public func topUp(amount:Float){
    currentBalance += amount;
  };
  public func withDraw(amount:Float){
    if(currentBalance - amount >= 0){
      currentBalance-=amount;
    }else{
      Debug.print("Insufficient Balance");
    }
  }
}
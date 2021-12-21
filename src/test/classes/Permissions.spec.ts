import { IErrorType, Permission, RittaError } from "../..";
import { Permissions } from "../../classes/Permissions";

describe("Permissions", () => {
  describe("getPermissions", () => {
    it("should return an array of strings", () => {
      const result = Permissions.getPermissions(
        Permissions.permissions.getAllUsers
      );

      expect(result).toEqual(["getAllUsers"]);
    });

    it("should throw error if number is 0", () => {
      expect(() => {
        Permissions.getPermissions(0);
      }).toThrow(
        new RittaError(
          "Too small permission number",
          IErrorType.INVALID_PERMISSION
        )
      );
    });
  });

  describe("addPermissions", () => {
    it("should throw error because it already had the permission", () => {
      expect(() => {
        Permissions.addPermissions(
          1,
          Permission.GET_ALL_USERS,
          Permission.DISABLE_LOGIN
        );
      }).toThrow(
        new RittaError(
          "Permission has already been added",
          IErrorType.PERMISSION_IS_ALREADY_ADDED
        )
      );
    });

    it("should add the permission", () => {
      const result = Permissions.addPermissions(1, Permission.DISABLE_LOGIN);

      expect(result).toEqual(3);
    });

    it("should add multiple permissions", () => {
      const result = Permissions.addPermissions(
        1,
        Permission.DISABLE_LOGIN,
        Permission.DISABLE_REGISTER
      );

      expect(result).toEqual(7);
    });
  });

  describe("removePermissions", () => {
    it("should throw error because it didn't have the permission", () => {
      expect(() => {
        Permissions.removePermissions(
          1,
          Permission.GET_ALL_USERS,
          Permission.DISABLE_LOGIN
        );
      }).toThrow(
        new RittaError(
          "Permission has not been added",
          IErrorType.PERMISSION_IS_NOT_ADDED
        )
      );
    });

    it("should remove the permission", () => {
      const result = Permissions.removePermissions(3, Permission.DISABLE_LOGIN);

      expect(result).toEqual(1);
    });

    it("should remove multiple permissions", () => {
      const result = Permissions.removePermissions(
        7,
        Permission.DISABLE_LOGIN,
        Permission.DISABLE_REGISTER
      );

      expect(result).toEqual(1);
    });
  });
});

pragma solidity ^0.5.12;
import "./SafeMath.sol";
import "./IERC721.sol";

contract KittyContract is IERC721 {
    using SafeMath for uint256;

    /* struct Kitty {
        string name;
        string dna;
        uint32 generation;
    }*/

    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint32 generation;
    }

    Kitty[] internal kitties;
    string _tokenName = "Kitty Token";
    string _tokenSymbol = "CAT";

    mapping(uint256 => address) internal kittyToOwner;
    mapping(address => uint256) internal ownerKittyCount;

    constructor() public {
        kitties.push(Kitty({
            genes: 0,
            birthTime: 0,
            mumId: 0,
            dadId: 0,
            generation: 0
        }));
    }

    /**
     * @dev Returns the Kitty for the given kittyId
     */
    function getKitty(uint256 kittyId)
        external
        view
        returns (
            uint256 genes,
            uint64 birthTime,
            uint32 mumId,
            uint32 dadId,
            uint32 generation
        )
    {
        Kitty storage kitty = kitties[kittyId];
        return (
            kitty.genes,
            kitty.birthTime,
            kitty.mumId,
            kitty.dadId,
            kitty.generation
        );
    }

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance) {
        return ownerKittyCount[owner];
    }

    /*
     * @dev Returns the total number of tokens in circulation.
     */
    function totalSupply() external view returns (uint256 total) {
        // is the Unkitty considered part of the supply?
        return kitties.length - 1;
    }

    /*
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory tokenName) {
        return _tokenName;
    }

    /*
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory tokenSymbol) {
        return _tokenSymbol;
    }

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner) {
        require(tokenId <= kitties.length, "invalid kittyId");
        return kittyToOwner[tokenId];
    }

    /* @dev Transfers `tokenId` token from `msg.sender` to `to`.
     *
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `to` can not be the contract address.
     * - `tokenId` token must be owned by `msg.sender`.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 tokenId) external {
        require(kittyToOwner[tokenId] == msg.sender, "not owner");
        require(to != address(0), "to zero address");
        require(to != address(this), "to contract address");

        _transfer(msg.sender, to, tokenId);
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        // assign new owner
        kittyToOwner[_tokenId] = _to;

        //update token counts
        ownerKittyCount[_to] = ownerKittyCount[_to].add(1);

        if (_from != address(0)) {
            ownerKittyCount[_from] = ownerKittyCount[_from].sub(1);
        }

        // emit Transfer event
        emit Transfer(_from, _to, _tokenId);
    }
}